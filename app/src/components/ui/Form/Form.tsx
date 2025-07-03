import Card from "../Card/Card";

export interface FormProps {
  children: React.ReactNode;
  className?: string;
}

const Form = ({ children, className }: FormProps) => {
  return (
    <Card className={`bg-[var(--form-background)] ${className}`}>
      <form>{children}</form>
    </Card>
  );
};

export default Form;
