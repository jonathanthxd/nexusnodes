import { Icon } from "./icon";

export function InfraConsole({ mode = "minecraft" }: { mode?: "minecraft" | "vps" }) {
  if (mode === "vps") {
    return (
      <div className="infra-console">
        <div className="console-chrome"><span/><span/><span/><b>nx-vps-04 · console</b></div>
        <div className="console-body">
          <div className="terminal-lines">
            <p><span className="term-dim">$</span> nx deploy <b>ubuntu-lts</b> --region mia</p>
            <p><span className="term-ok">✓</span> instance allocated</p>
            <p><span className="term-ok">✓</span> nvme volume attached</p>
            <p><span className="term-ok">✓</span> network interface ready</p>
            <p><span className="term-purple">→</span> cloud-init running...</p>
          </div>
          <div className="console-stats"><span><Icon name="cpu"/><b>4</b> vCPU</span><span><Icon name="memory"/><b>8 GB</b> RAM</span><span><Icon name="disk"/><b>80 GB</b> NVMe</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="infra-console">
      <div className="console-chrome"><span/><span/><span/><b>survival-01 · live</b></div>
      <div className="console-body">
        <div className="server-live-head"><div><span className="live-ring"><i/></span><div><strong>survival-01</strong><span>Paper · Java 21</span></div></div><span className="live-pill"><i/> ONLINE</span></div>
        <div className="server-kpis"><div><span>PLAYERS</span><strong>37<small>/80</small></strong></div><div><span>TPS</span><strong>20.0</strong></div><div><span>RAM</span><strong>6.4<small>/8GB</small></strong></div></div>
        <div className="resource-bars"><div><span>CPU</span><i><b style={{ width: "42%" }}/></i><em>42%</em></div><div><span>RAM</span><i><b style={{ width: "80%" }}/></i><em>80%</em></div><div><span>Disk</span><i><b style={{ width: "31%" }}/></i><em>31%</em></div></div>
      </div>
    </div>
  );
}
