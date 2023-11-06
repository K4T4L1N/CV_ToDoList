import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { filterTask, removeTask, toggleDone } from "../../redux/todoSlice";
import { ControlButton } from "../control-button";
import { DateCard } from "../date-card";
import { Badge } from "../badge";
import { Input } from "../common/input";
import { iTodosList } from "../../types/todo_list_interface";
import "./index.scss";

export const TodosList = ({ filterOption }: iTodosList): JSX.Element => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.todos.tasks);
  const { filteredTask } = useAppSelector((state) => state.todos.filterTask);
  const { searchTerm, SearchedTasks } = useAppSelector(
    (state) => state.todos.searchTask
  );
  const today = new Date().toDateString();

  //Filters the tasks
  //each time a change(add, delete or update) happens:
  useEffect(() => {
    dispatch(filterTask(filterOption));
  }, [tasks]);

  /**
   * If filter("All" ,"Complete" or "Active") is selected or searchTerm entered,
   * filteredTasks or searchedTasks are shown;
   * Otherwise, activeTasks render.
   */
  const activeTasks = tasks.filter((task) => task.done === false);
  let displayingTasks = searchTerm ? SearchedTasks : activeTasks;

  if (filterOption) {
    displayingTasks = filteredTask;
  }
  if (filterOption && searchTerm) {
    displayingTasks = SearchedTasks;
  }

  // Deletes a task row by clicking on "delete" icon
  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
  };

  //Finds task by its "id" to be edited:
  const handleFetchedDataToEdit = (id: string) => {
    const fetchedData = tasks.find((task) => task.id === id);
    return fetchedData!;
  };

  // Toggles complete and uncomplete task
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleDone(event.target.id));
  };

  // Rendering tasks list
  return (
    <>
      <div className="task-list">
        <ul className="list-group list-group-light">
          {displayingTasks.map((task) => (
            <div key={task.id} className="task-row">
              <li className="list-group-item">
                {/* Task checkbox */}
                <Input
                  className="form-check-input clickable me-1"
                  type="checkbox"
                  id={task.id}
                  checked={task.done && true} //Complete tasks get checked
                  onChange={handleCheckboxChange}
                />

                {/*
                 * Task name
                 * Complete tasks get line-through style and green color
                 */}
                <span
                  className={task.done ? "task-name task-done" : "task-name"}
                >
                  {task.title}
                </span>

                {/* Renders "Today" badge for the tasks with the date of today */}
                <div className="today-badge mx-1">
                  {new Date(task.date).toDateString() === today && (
                    <Badge label={"Today"} />
                  )}
                </div>

                {/* Task date and control buttons of each list item */}
                <div className="control-date-group d-flex ms-auto">
                  <DateCard date={task.date} />
                  <ControlButton
                    fetchedDataToEdit={handleFetchedDataToEdit(task.id)}
                    onDelete={() => handleDelete(task.id)}
                  />
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
