import { Link, useParams } from 'react-router'
import { useVendor } from '../hooks/useVendor.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendor, menu, loading, error } = useVendor(id)

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />
  if (!vendor) return <p>Vendor not found. <Link to="/">Back to vendors</Link></p>

  // Each cart line must know its vendor, so orders can be split per vendor.
  const items = menu.map((item) => ({ ...item, vendorName: vendor.name }))

  return (
    <section>
      <p><Link to="/">&larr; All vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location} &middot; Open: {vendor.openHours}</p>
      <MenuList items={items} />
    </section>
  )
}

export default VendorPage