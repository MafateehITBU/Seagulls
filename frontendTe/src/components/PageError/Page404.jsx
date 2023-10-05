import ImgPage404 from "../../assets/error-404.svg"

function Page404() {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="text-center mt-4">
                            <img className="mb-4 img-error" src={ImgPage404} />
                            <p className="lead">This requested URL was not found on this server.</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Page404  