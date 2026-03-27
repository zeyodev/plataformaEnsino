declare module "*.module.css";
declare module "*.module.scss";
declare module "*.svg";

interface RequireContext {
    keys(): string[];
    (id: string): string;
}

interface NodeRequire {
    context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): RequireContext;
}