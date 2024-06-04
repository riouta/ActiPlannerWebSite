import React from 'react';

interface ErrorAlertProps {
    message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
    return <div className="error-alert">{message}</div>;
};

export default ErrorAlert;
