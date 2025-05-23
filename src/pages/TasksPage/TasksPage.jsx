import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskList } from "../../components/TaskList/TaskList";
import { TaskEditor } from "../../components/TaskEditor/TaskEditor";
import { fetchTasks } from "../../redux/tasks/operations";
import { selectLoading } from "../../redux/tasks/selectors";

export default function TasksPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <title>Your tasks</title>
      <TaskEditor />
      <div>{isLoading && "Request in progress..."}</div>
      <TaskList />
    </>
  );
}
