import { I } from "zeyo"

const svgContext = (require as any).context("lucide-static/icons", false, /\.svg$/)

function kebabToCamel(str: string): string {
    return str.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
}

export interface LucideIcon {
    name: string
    create: () => InstanceType<typeof I>
}

const catalog: Map<string, string> = new Map()

for (const key of svgContext.keys()) {
    const kebab = key.replace("./", "").replace(".svg", "")
    const camel = "icon" + kebabToCamel(kebab).replace(/^./, c => c.toUpperCase())
    catalog.set(camel, svgContext(key))
}

export function getIcon(name: string): InstanceType<typeof I> {
    const svg = catalog.get(name)
    if (!svg) return (new class extends I { }).HTML("")
    return (new class extends I { }).HTML(svg)
}

export function getAllIconNames(): string[] {
    return Array.from(catalog.keys())
}

export { catalog }
