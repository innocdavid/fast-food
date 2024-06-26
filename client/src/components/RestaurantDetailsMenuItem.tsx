import { MenuItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    menuItem: MenuItem;
    addToCart: () => void;
};

const RestaurantDetailsMenuItem = ({ menuItem, addToCart }: Props) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
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