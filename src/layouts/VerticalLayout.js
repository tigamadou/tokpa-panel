// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import dynamicMenus from '@src/navigation/vertical'

const VerticalLayout = props => {

  const { Menus } = dynamicMenus()
  return (
    <Layout menuData={Menus} {...props}>
      {props.children}
    </Layout>
  )
}

export default VerticalLayout
