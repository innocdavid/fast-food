import { MenuItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    menuItem: MenuItem;
};

const RestaurantDetailsMenuItem = ({ menuItem }: Props) => {
    return (
        <Card className="cursor-pointer">
            <CardHeader className="font-bold">
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
                UGX {menuItem.price}
            </CardContent>
        </Card>
    );
};

export default RestaurantDetailsMenuItem;