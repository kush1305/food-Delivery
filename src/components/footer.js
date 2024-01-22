import React from 'react'
import { Link } from 'react-router-dom'

export default function footer() {
  return (
    <div>
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      
      <span class="text-muted">© 2021 Company, Inc</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"><Link class="text-muted" to="/"><svg class="bi" width="24" height="24"></svg></Link></li>
      <li class="ms-3"><Link class="text-muted" to="/"><svg class="bi" width="24" height="24"></svg></Link></li>
      <li class="ms-3"><Link class="text-muted" to="/"><svg class="bi" width="24" height="24"></svg></Link></li>
    </ul>
  </footer>
    </div>
  )
}
