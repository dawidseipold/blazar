const Sidebar = () => {
  return (
    <div>
      <select>
        <option>Personal</option>
        <option>Workspace</option>
      </select>

      <input type="text" placeholder="Search" />

      <ul>
        <li>Overview</li>
        <li>Tasks</li>
        <li>Calendar</li>
        <li>Analytics</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
