import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ItemDataCreateFormInputValues = {
    template?: string;
    templateName?: string;
    thumbnail?: string;
    videos?: string[];
    Navigations?: string[];
};
export declare type ItemDataCreateFormValidationValues = {
    template?: ValidationFunction<string>;
    templateName?: ValidationFunction<string>;
    thumbnail?: ValidationFunction<string>;
    videos?: ValidationFunction<string>;
    Navigations?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemDataCreateFormOverridesProps = {
    ItemDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    template?: PrimitiveOverrideProps<TextFieldProps>;
    templateName?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnail?: PrimitiveOverrideProps<TextFieldProps>;
    videos?: PrimitiveOverrideProps<TextFieldProps>;
    Navigations?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemDataCreateFormProps = React.PropsWithChildren<{
    overrides?: ItemDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ItemDataCreateFormInputValues) => ItemDataCreateFormInputValues;
    onSuccess?: (fields: ItemDataCreateFormInputValues) => void;
    onError?: (fields: ItemDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemDataCreateFormInputValues) => ItemDataCreateFormInputValues;
    onValidate?: ItemDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function ItemDataCreateForm(props: ItemDataCreateFormProps): React.ReactElement;
