import AddTodo from "../test/AddTodo";
import Todos from "../test/Todos";
import ImageUploader from "./ImageUploader";

const DashboardContent = () => {
  return (
    <>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="card-title">Welcome!</h2>
          <p className="card-text">This is a placeholder for your main dashboard content. You can add charts, data tables, and more here.</p>
        </div>
        <AddTodo />
        <Todos />
      </div>
      <ImageUploader />
    </>

  );
};

export default DashboardContent;