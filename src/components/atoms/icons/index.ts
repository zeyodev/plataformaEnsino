import { catalog, getIcon } from "../../../icons/lucideCatalog"
import styles from "./styles.module.css"

export type IconMapping = { [K in string]: string }

export const iconMapping: { [key: string]: () => ReturnType<typeof getIcon> } = {}

for (const name of catalog.keys()) {
    iconMapping[name] = () => getIcon(name)
}

export default (icon: string) => {
    if (!iconMapping[icon])
        return getIcon("iconActivity")
    return iconMapping[icon]().class(styles.icon)
}
