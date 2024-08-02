class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="text-white pt-20 pb-19 ">
                <div class=" text-center text-md-left">
                    <hr class="mb-4">
                    <div class="row justify-content-center">
                        <div class="col-md-7 col-lg-8">
                            <p>Sosial
                                <a href="#" style="text-decoration: none;">
                                    <strong class="text-warning"> Media </strong>
                                </a>
                            </p> 
                        </div>

                  
                        <div class="row justify-content-center">
                            <div class="col-md-5 col-ld-4 text-center">
                                <ul class="list-unstyled list-inline">
                                    <li class="list-inline-item">
                                        <a href="#" class="btn-floating btn-sm text-white" style="font-size: 20px;"><i class="fab fa-youtube"></i></a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="#" class="btn-floating btn-sm text-white" style="font-size: 20px;"><i class="fab fa-facebook"></i></a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="#" class="btn-floating btn-sm text-white" style="font-size: 20px;"><i class="fab fa-instagram"></i></a>
                                    </li>
                                    <li class="list-inline-item">
                                        <a href="#" class="btn-floating btn-sm text-white" style="font-size: 20px;"><i class="fas fa-envelope"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
             </footer>
        `;
    }
}
customElements.define('custom-footer', Footer);
