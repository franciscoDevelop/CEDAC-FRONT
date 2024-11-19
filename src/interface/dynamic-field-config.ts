export interface DynamicFieldConfig {
    type: string; // Tipos de campos
    label?: string; // Etiqueta del campo
    name?: string | any; // Nombre del control
    value?: any; // Valor inicial
    position?: 'left' | 'center' | 'right'; // Posición del campo
    options?: any[]; // Opciones para select
    row?: number; // Número de fila
    actions?: () => void; // Eventos dinámicos
    classes?: string; // Clases adicionales para estilos personalizados
}
