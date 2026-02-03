import Context from "../states/context";
import { ZeyoAppConstructor } from "./lib";

export default function AutenticacaoPlugin<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        url = process.env.AUTH_SERVER_URL || "https://autenticador.zeyo.org";

        getTokens(verifica?: true): [string, string]
        getTokens(verifica?: boolean): [string | null, string | null] {
            const [accessToken, refreshToken] = [
                localStorage.getItem('accessToken'),
                localStorage.getItem('refreshToken'),
            ]
            if (verifica)
                return [accessToken || "", refreshToken || ""]
            return [accessToken, refreshToken]
        }

        async setTimeoutToRefresh() {
            const timeToRefresh = Number(localStorage.getItem("timeToRefresh"))
            const miliToRefresh = timeToRefresh - new Date().getTime()
            console.log("Faltam para Refresh", miliToRefresh)
            if (miliToRefresh > 0)
                setTimeout(async () => {
                    this.refreshToken()
                }, miliToRefresh + 300);
        }

        async refreshToken(): Promise<{ accessToken: string, refreshToken: string }> {
            const timeToRefresh = Number(localStorage.getItem("timeToRefresh"))
            const [accessToken, refreshToken] = this.getTokens(true)
            this.setTimeoutToRefresh()
            if (Number(timeToRefresh) < new Date().getTime())
                return new Promise(resolve => {
                    fetch(`${this.url}/refresh`, {
                        method: 'GET',
                        headers: {
                            'accesstoken': accessToken,
                            'refreshtoken': refreshToken
                        },
                    }).then(async res => {
                        if (res.status !== 200) {
                            return resolve({ accessToken, refreshToken })
                        }
                        const tokens = await res.json()
                        console.log(tokens)
                        this.setTokens(tokens)
                        this.updateToken()
                        resolve(tokens)
                    })
                        .catch(err => console.log(err))
                })
            return { accessToken, refreshToken }
        }

        naoEstaAutenticado(): boolean {
            const [accessToken, refreshToken] = this.getTokens()
            return (!accessToken || !refreshToken || refreshToken === 'undefined' || accessToken === 'undefined')
        }

        setTokens({ accessToken, refreshToken, miliToRefresh }: { accessToken: string; refreshToken: string, miliToRefresh?: number }) {
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)
            if (miliToRefresh) {
                localStorage.setItem('timeToRefresh', (miliToRefresh + new Date().getTime()).toString())
                this.refreshToken()
            }
        }

        updateToken = () => { }
        onTokenSet(cb: () => void) {
            this.updateToken = cb;
        }

        autentica(data: any) {
            return new Promise((resolve) => {
                fetch(`${this.url}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(async res => {
                    if (res.status !== 200) {
                        return resolve(new Error("Não foi possível conectar ao servidor"))
                    }
                    const tokens = await res.json()
                    this.setTokens(tokens)
                    resolve(tokens)
                })
                    .catch(err => console.log(err))
            })
        }
    }
}