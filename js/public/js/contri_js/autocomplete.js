$(function(){

    $(".aPhylum").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/aPhylum/?aPhylum=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".aClass").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/aClass/?aClass=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".aOrder").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/aOrder/?aOrder=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".aFamily").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/aFamily/?aFamily=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".aGenus").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/aGenus/?aGenus=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".aSpecies").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/aSpecies/?aSpecies=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".bPhylum").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bPhylum/?bPhylum=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".bClass").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bClass/?bClass=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".bOrder").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bOrder/?bOrder=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".bFamily").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bFamily/?bFamily=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".bGenus").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bGenus/?bGenus=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

    $(".bSpecies").autocomplete({
        source: (req, res) => {
            $.ajax({
                type: "GET",
                url: "/search/bSpecies/?bSpecies=" + req.term,
                success: (response) => {
                    res(response.data);
                },
                error: (response) => {
                    console.log(response.detail);
                }
            });
        },
    });

});