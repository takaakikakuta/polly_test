import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ItemData } from "./graphql/types";
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
export declare type ItemDataUpdateFormInputValues = {
    template?: string;
    templateName?: string;
    thumbnail?: string;
    videos?: string[];
    Navigations?: string[];
};
export declare type ItemDataUpdateFormValidationValues = {
    template?: ValidationFunction<string>;
    templateName?: ValidationFunction<string>;
    thumbnail?: ValidationFunction<string>;
    videos?: ValidationFunction<string>;
    Navigations?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemDataUpdateFormOverridesProps = {
    ItemDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    template?: PrimitiveOverrideProps<TextFieldProps>;
    templateName?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnail?: PrimitiveOverrideProps<TextFieldProps>;
    videos?: PrimitiveOverrideProps<TextFieldProps>;
    Navigations?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: ItemDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    itemData?: ItemData;
    onSubmit?: (fields: ItemDataUpdateFormInputValues) => ItemDataUpdateFormInputValues;
    onSuccess?: (fields: ItemDataUpdateFormInputValues) => void;
    onError?: (fields: ItemDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemDataUpdateFormInputValues) => ItemDataUpdateFormInputValues;
    onValidate?: ItemDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ItemDataUpdateForm(props: ItemDataUpdateFormProps): React.ReactElement;
