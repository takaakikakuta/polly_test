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
export declare type NavigationObjectCreateFormInputValues = {
    id?: string;
    order?: number;
    Navgation?: string;
};
export declare type NavigationObjectCreateFormValidationValues = {
    id?: ValidationFunction<string>;
    order?: ValidationFunction<number>;
    Navgation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavigationObjectCreateFormOverridesProps = {
    NavigationObjectCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id?: PrimitiveOverrideProps<TextFieldProps>;
    order?: PrimitiveOverrideProps<TextFieldProps>;
    Navgation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NavigationObjectCreateFormProps = React.PropsWithChildren<{
    overrides?: NavigationObjectCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NavigationObjectCreateFormInputValues) => NavigationObjectCreateFormInputValues;
    onSuccess?: (fields: NavigationObjectCreateFormInputValues) => void;
    onError?: (fields: NavigationObjectCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NavigationObjectCreateFormInputValues) => NavigationObjectCreateFormInputValues;
    onValidate?: NavigationObjectCreateFormValidationValues;
} & React.CSSProperties>;
export default function NavigationObjectCreateForm(props: NavigationObjectCreateFormProps): React.ReactElement;
