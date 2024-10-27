import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { NavigationObject } from "./graphql/types";
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
export declare type NavigationObjectUpdateFormInputValues = {
    id?: string;
    order?: number;
    Navgation?: string;
};
export declare type NavigationObjectUpdateFormValidationValues = {
    id?: ValidationFunction<string>;
    order?: ValidationFunction<number>;
    Navgation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavigationObjectUpdateFormOverridesProps = {
    NavigationObjectUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id?: PrimitiveOverrideProps<TextFieldProps>;
    order?: PrimitiveOverrideProps<TextFieldProps>;
    Navgation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NavigationObjectUpdateFormProps = React.PropsWithChildren<{
    overrides?: NavigationObjectUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    navigationObject?: NavigationObject;
    onSubmit?: (fields: NavigationObjectUpdateFormInputValues) => NavigationObjectUpdateFormInputValues;
    onSuccess?: (fields: NavigationObjectUpdateFormInputValues) => void;
    onError?: (fields: NavigationObjectUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NavigationObjectUpdateFormInputValues) => NavigationObjectUpdateFormInputValues;
    onValidate?: NavigationObjectUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NavigationObjectUpdateForm(props: NavigationObjectUpdateFormProps): React.ReactElement;
