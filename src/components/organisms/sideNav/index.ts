import { Div, ZeyoAs } from "zeyo";
import NavOption from "../../molecules/navOption";
import App from "../../../app";
import Option from "../../../options";
import style from "./style.module.css"

export default class SideNav extends Div {
    constructor(private app: App) {
        super();
        this.class("d-grid", "gap-m", style.navigation)
    }

    setInfo(options: Option[], cb: (option: Option) => void, selected?: number){
        this.children(
            ...options.map((option) => {
                return new NavOption(this.app, option, (opt) => {
                    cb(opt.option);
                    this.object(o => {
                        (o.childList as NavOption[]).forEach(i => {
                            if(i.option.path === option.path)
                                i.selected();
                            else
                            i.deselected();
                        })
                    })
            
                })
            }),
        );
        if(selected === undefined) return this;
        
        const option = (this.childList as NavOption[])[selected];
        option.selected();
        cb(option.option);
        
        return this;
    }
}