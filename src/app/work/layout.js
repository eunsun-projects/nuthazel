import '../globals.css'
import SetScreenSize from '@/components/setscreensize'

export default function PortfolioLayout({ children }) {
    return (
        <>
        <SetScreenSize/>
            <div style={{height : '100%', minHeight:'calc(var(--vh, 1vh) * 100)', overflowY:"auto"}}>
                {children}
            </div>
        </>
    )
}