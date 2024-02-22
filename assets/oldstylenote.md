
/** Showcase Card **/
.pn-card-showcase {
    margin-top: 50px;
    margin-bottom: 50px;
    min-height: 60vh;
    height: auto;
    width: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.00) 88.02%), url(https://clarknarvas.com/uploads/tv.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: ease-in-out 0.3s;
    

    /** Card content width broken**/

  
    .pn-showcasecard-position-absolute {
        position: absolute;
    }

    .pn-sccard-content {
        cursor: pointer;


        height: 60vh;
        width: inherit;
        padding-right: 40px;
        padding-bottom: 40px;
        padding-top: 40px;
        padding-left: 20px;
        color: white;

    
        .pn-card-top {
            h2 {
                font-size: 4em;
                color: white !important;
            }
            height: 35%;
            width: 50%;
        }
    
        .pn-card-bottom {
            height: 35%;
            p {
                font-size: 1.5em;
            }

            

            .row {
                height: 100%;
                .align-bottom {
                    display: grid;
                    align-items: end;
                }
            }

            

        }
    
        .pn-card-middle {
            height: 35%;
        }
    }




}

.pn-card-showcase:hover {
    transition: ease-in-out 0.5s;
    background-size: cover;
    

    .btn-light {
        background-color: #c8c8c8;
        border: #c8c8c8 solid 1px;
    }

    .pn-showcase-highlight {
        width: 100%;
    }
}



@media (max-width: 768px) {

    .pn-card-showcase {
        

        margin-top: 15px;
        margin-bottom: 15px;
        min-height: 60vh;
        height: auto;

        background-color: red;
        .pn-sccard-content {
            background-color: red;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            min-height: 60vh;
            height: auto;
            text-align: center;
            padding-bottom: 4vh;
    
            .pn-card-top {
                width: 100% !important;
                h2 {
                    font-size: 300%;
                    text-align: center;
                }

            }

            .pn-card-middle {
                height: 30%;
                background-color: blue;

            }
        


            .pn-card-bottom {
                p {
                    font-size: 1.3em;
                }
            }
    
        }

        .pn-showcasecard-position-absolute {
            position:relative;
        }

        .pn-showcase-highlight {
            display: none;
        }

    }





} 


@media (max-width: 998px) {

    .pn-card-showcase {
        


        background-color: red;
        .pn-sccard-content {
            width: 97%;

    
        }
    }



} 

