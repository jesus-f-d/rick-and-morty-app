export default function Filters({ filters, onChange }) {
  function handle(field, value) {
    onChange({ ...filters, [field]: value, page: 1 })
  }

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filters.name}
        onChange={(e) => handle('name', e.target.value)}
      />

      <select value={filters.status} onChange={(e) => handle('status', e.target.value)}>
        <option value="">Estado (todos)</option>
        <option value="alive">Vivo</option>
        <option value="dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>

      <select value={filters.gender} onChange={(e) => handle('gender', e.target.value)}>
        <option value="">Genero (todos)</option>
        <option value="female">Femenino</option>
        <option value="male">Masculino</option>
        <option value="genderless">Sin genero</option>
        <option value="unknown">Desconocido</option>
      </select>
    </div>
  )
}
