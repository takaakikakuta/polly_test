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
export declare type DemoDataCreateFormInputValues = {
    template?: string;
    templateName?: string;
    thumbnail?: string;
    videos?: string[];
    Navigations?: string[];
};
export declare type DemoDataCreateFormValidationValues = {
    template?: ValidationFunction<string>;
    templateName?: ValidationFunction<string>;
    thumbnail?: ValidationFunction<string>;
    videos?: ValidationFunction<string>;
    Navigations?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DemoDataCreateFormOverridesProps = {
    DemoDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    template?: PrimitiveOverrideProps<SelectFieldProps>;
    templateName?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnail?: PrimitiveOverrideProps<TextFieldProps>;
    videos?: PrimitiveOverrideProps<TextFieldProps>;
    Navigations?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DemoDataCreateFormProps = React.PropsWithChildren<{
    overrides?: DemoDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DemoDataCreateFormInputValues) => DemoDataCreateFormInputValues;
    onSuccess?: (fields: DemoDataCreateFormInputValues) => void;
    onError?: (fields: DemoDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DemoDataCreateFormInputValues) => DemoDataCreateFormInputValues;
    onValidate?: DemoDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function DemoDataCreateForm(props: DemoDataCreateFormProps): React.ReactElement;
