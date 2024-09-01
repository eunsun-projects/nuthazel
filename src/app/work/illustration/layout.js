import '../../globals.css'
import '../../react-carousel.es.css'

export default function IllustLayout({ children }) {
    return (
        <div style={{height : '100%', minHeight:'calc(var(--vh, 1vh) * 100)', overflowY:"auto"}}>
            {children}
        </div>
    )
}