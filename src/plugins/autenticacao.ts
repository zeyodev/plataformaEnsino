import { ZeyoAppConstructor } from "./lib";

export default function AutenticacaoPlugin<Base extends ZeyoAppConstructor>(base: Base) {
    return class extends base {
        url = window.location.origin;

        getAccessToken(): string | null {
            return localStorage.getItem('accessToken');
        }

        naoEstaAutenticado(): boolean {
            const token = this.getAccessToken();
            return !token || token === 'undefined';
        }

        setTokens({ accessToken }: { accessToken: string }) {
            localStorage.setItem("accessToken", accessToken);
            this.updateToken();
        }

        limparTokens() {
            localStorage.removeItem("accessToken");
        }

        updateToken = () => { }
        onTokenSet(cb: () => void) {
            this.updateToken = cb;
        }

        autentica(data: { email: string; senha: string }) {
            return new Promise((resolve) => {
                fetch(`${this.url}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(async res => {
                    if (res.status !== 200) {
                        const erro = await res.json().catch(() => ({}));
                        return resolve(new Error(erro.error || "Não foi possível conectar ao servidor"));
                    }
                    const { accessToken, usuario } = await res.json();
                    this.setTokens({ accessToken });
                    resolve({ accessToken, usuario });
                }).catch(err => {
                    console.log(err);
                    resolve(new Error("Erro de conexão com o servidor"));
                });
            });
        }

        registrar(data: { email: string; senha: string; nome?: string }) {
            return new Promise((resolve) => {
                fetch(`${this.url}/registrar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(async res => {
                    if (res.status !== 201) {
                        const erro = await res.json().catch(() => ({}));
                        return resolve(new Error(erro.error || "Erro ao registrar"));
                    }
                    const resultado = await res.json();
                    resolve(resultado);
                }).catch(err => {
                    console.log(err);
                    resolve(new Error("Erro de conexão com o servidor"));
                });
            });
        }
    }
}