import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MapDataCreateFormInputValues = {
    template?: string;
    templateName?: string;
    selectView?: string;
    thumbnail?: string;
    RoomList?: string[];
    DemoList?: string[];
    ItemList?: string[];
};
export declare type MapDataCreateFormValidationValues = {
    template?: ValidationFunction<string>;
    templateName?: ValidationFunction<string>;
    selectView?: ValidationFunction<string>;
    thumbnail?: ValidationFunction<string>;
    RoomList?: ValidationFunction<string>;
    DemoList?: ValidationFunction<string>;
    ItemList?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MapDataCreateFormOverridesProps = {
    MapDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    template?: PrimitiveOverrideProps<SelectFieldProps>;
    templateName?: PrimitiveOverrideProps<TextFieldProps>;
    selectView?: PrimitiveOverrideProps<SelectFieldProps>;
    thumbnail?: PrimitiveOverrideProps<TextFieldProps>;
    RoomList?: PrimitiveOverrideProps<TextFieldProps>;
    DemoList?: PrimitiveOverrideProps<TextFieldProps>;
    ItemList?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MapDataCreateFormProps = React.PropsWithChildren<{
    overrides?: MapDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MapDataCreateFormInputValues) => MapDataCreateFormInputValues;
    onSuccess?: (fields: MapDataCreateFormInputValues) => void;
    onError?: (fields: MapDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MapDataCreateFormInputValues) => MapDataCreateFormInputValues;
    onValidate?: MapDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function MapDataCreateForm(props: MapDataCreateFormProps): React.ReactElement;
