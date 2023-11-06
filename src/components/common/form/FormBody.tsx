import { UseFormRegister, useFormState } from "react-hook-form";
import { FormData } from "../../../components/modal/AddModal";

interface FormBodyProps {
  id?: string;
  task: string;
  date: string;
  handleTaskChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FormData>;
  errors: ReturnType<typeof useFormState>["errors"];
}

export const FormBody = ({
  id,
  task,
  date,
  handleTaskChange,
  handleDateChange,
  register,
  errors,
}: FormBodyProps): JSX.Element => {
  return (
    <div className="row">
      <div className="col-7">
        {/* Hidden field for "id" to be passed via payload for editing a task */}
        <input type="hidden" value={id} {...register("id")} />

        {/* "Task" field with label and error message */}
        <label htmlFor="task">Task</label>
        <input
          id="task"
          value={task}
          {...register("task", { required: true })}
          onChange={handleTaskChange}
          className="form-control"
          placeholder="Call mom/Pay phone bill..."
        />
        {errors.task && <p className="text-danger">Task is required.</p>}
      </div>

      <div className="col-5">
        {/* "Date" field with label and error message */}
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          {...register("date", { required: true })}
          onChange={handleDateChange}
          className="form-control"
        />
        {errors.date && <p className="text-danger">Please pick a date.</p>}
      </div>
    </div>
  );
};
