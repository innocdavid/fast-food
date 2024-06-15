import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
    cusine: string;
    field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CusineCheckbox = ({ cusine, field }: Props) => {
    return (
        <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox 
                    className="bg-white"
                    checked={field.value.includes(cusine)}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            field.
                        }
                    }}
                />
            </FormControl>
        </FormItem>
    );
};

export default CusineCheckbox;