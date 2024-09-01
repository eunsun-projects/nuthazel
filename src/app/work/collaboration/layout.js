import '../../globals.css'
import SetScreenSize from '@/components/setscreensize'
// import Footer from '@/components/footer'

export default function CollaborationLayout({ children }) {
    return (
        <>
        <SetScreenSize/>
        <div style={{height:'calc(var(--vh, 1vh) * 100)',backgroundColor: '#916b4d'}}>
            {children}
            {/* <Footer/> */}
        </div>
        </>
    )
}