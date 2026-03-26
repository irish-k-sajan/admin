import './SidePanel.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
export default function SidePanel() {
  return (
    <aside className="side-panel">
      <nav className="side-panel-nav">
        <ul>
          <li><a href="/"><HomeOutlinedIcon fontSize='medium'/></a></li>
        </ul>
      </nav>
    </aside>
  );
}
