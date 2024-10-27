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
export declare type CameraPointDataCreateFormInputValues = {
    slug?: string;
    radian?: number;
    image?: string;
    cameraRadian?: number;
};
export declare type CameraPointDataCreateFormValidationValues = {
    slug?: ValidationFunction<string>;
    radian?: ValidationFunction<number>;
    image?: ValidationFunction<string>;
    cameraRadian?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CameraPointDataCreateFormOverridesProps = {
    CameraPointDataCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    slug?: PrimitiveOverrideProps<TextFieldProps>;
    radian?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    cameraRadian?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CameraPointDataCreateFormProps = React.PropsWithChildren<{
    overrides?: CameraPointDataCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CameraPointDataCreateFormInputValues) => CameraPointDataCreateFormInputValues;
    onSuccess?: (fields: CameraPointDataCreateFormInputValues) => void;
    onError?: (fields: CameraPointDataCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CameraPointDataCreateFormInputValues) => CameraPointDataCreateFormInputValues;
    onValidate?: CameraPointDataCreateFormValidationValues;
} & React.CSSProperties>;
export default function CameraPointDataCreateForm(props: CameraPointDataCreateFormProps): React.ReactElement;
