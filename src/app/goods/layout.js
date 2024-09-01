import '../globals.css'
import SetScreenSize from '@/components/setscreensize'
// import Footer from '@/components/footer'

export default function GoodsLayout({ children }) {
    return (
        <>
        <SetScreenSize/>
        <div 
            style={{
                height : '100%', 
                minHeight: 'calc(var(--vh, 1vh) * 100 - 1px)', 
                overflowY: 'auto',
                overflowX: 'hidden',
                // overflow:"hidden", 
                // backgroundColor:'#eee7d1'
                // backgroundColor:'#634f3e'
                backgroundColor:'#916b4d'
            }}>
            {children}
            {/* <Footer/> */}
        </div>
        </>
    )
}