import { Breadcrumb } from "antd";
import { useSelectorRoot } from "../../store/store";

export const LinkBreadcrum = () => {
    const {items} = useSelectorRoot(x => x.control)
    return (
        <Breadcrumb items={items} style={{padding: '10px 0px 0px 30px'}}></Breadcrumb>
    );
}