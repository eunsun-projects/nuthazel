import '../globals.css'
import SetScreenSize from '@/components/setscreensize'
// import Footer from '@/components/footer'

export default function AboutLayout({ children }) {
    return (
        <>
        <SetScreenSize/>
        <div 
            style={{
                height : '100%', 
                minHeight: 'calc(var(--vh, 1vh) * 100)', 
                overflowY:"auto", 
                // backgroundColor:'beige', 
                backgroundColor:'#eee7d1',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {children}
            {/* <Footer/> */}
        </div>
        </>
    )
}