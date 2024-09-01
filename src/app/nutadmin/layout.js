import '../globals.css'

export default function NutAdminLayout({ children }){

    //width:'100vw', height:'100vh',
    return(
        <div style={{ 
            background:'beige', 
            position:'relative', 
            zIndex:'5', 
            overflow: "hidden", 
            width: '100vw', 
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {children}
        </div>
    )
}