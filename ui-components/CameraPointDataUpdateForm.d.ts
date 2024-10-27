import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { CameraPointData } from "./graphql/types";
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
export declare type CameraPointDataUpdateFormInputValues = {
    slug?: string;
    radian?: number;
    image?: string;
    cameraRadian?: number;
};
export declare type CameraPointDataUpdateFormValidationValues = {
    slug?: ValidationFunction<string>;
    radian?: ValidationFunction<number>;
    image?: ValidationFunction<string>;
    cameraRadian?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CameraPointDataUpdateFormOverridesProps = {
    CameraPointDataUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    slug?: PrimitiveOverrideProps<TextFieldProps>;
    radian?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    cameraRadian?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CameraPointDataUpdateFormProps = React.PropsWithChildren<{
    overrides?: CameraPointDataUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    cameraPointData?: CameraPointData;
    onSubmit?: (fields: CameraPointDataUpdateFormInputValues) => CameraPointDataUpdateFormInputValues;
    onSuccess?: (fields: CameraPointDataUpdateFormInputValues) => void;
    onError?: (fields: CameraPointDataUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CameraPointDataUpdateFormInputValues) => CameraPointDataUpdateFormInputValues;
    onValidate?: CameraPointDataUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CameraPointDataUpdateForm(props: CameraPointDataUpdateFormProps): React.ReactElement;
