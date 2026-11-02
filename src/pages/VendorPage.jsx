import { useParams, Link } from 'react-router'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors.js'

function VendorPage() {
  const { id } = useParams()  // /vendor/kafe-ali gives id = 'kafe-ali'
  const { vendors, loading, error, reload } = useVendors()

  // 1. Loading & Error checks come FIRST
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  // 2. Find vendor after loading finishes
  const vendor = vendors.find((v) => String(v.id) === String(id))

  // 3. Vendor Not Found check
  if (!vendor) {
    return (
      <section>
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">
          There is no vendor called "{id}". <Link to="/">Back to vendors</Link>
        </p>
      </section>
    )
  }

  return (
    <section>
    <p><Link to="/">&larr; All vendors</Link></p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">{vendor.location} &middot; Open: {vendor.openHours}</p>
      <MenuList items={vendor.menu} />
    </section>
  )
}

export default VendorPage