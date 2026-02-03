export default function randomToken(length: number) {
    return new Array(25).join("0").replace(/[018]/g, (c: any) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(24)
    );
} 