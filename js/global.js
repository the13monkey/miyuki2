const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
window.addEventListener('resize', appHeight)
appHeight()

$(document).ready(function(){
    var autoNavLangChange = () => {
        $("#home .nav-link").delay(1000).slideToggle()
        $("#books .nav-link").delay(1500).slideToggle()
        $("#lyrics .nav-link").delay(2000).slideToggle()
        $("#yakais .nav-link").delay(2500).slideToggle()
        $("#contact .nav-link").delay(3000).slideToggle()
    }
    autoNavLangChange()
    setInterval(autoNavLangChange, 4000)

    $(".nav-link").click(function(event){
        event.preventDefault()
        $(".nav-link").removeClass("pink")
        $(this).parent().find(".nav-link").addClass("pink")
        var location = $(this).attr("href")
        var yPos = $(location).position().top
        $("html, body").animate({ scrollTop: yPos },500)
        var sectionheadHeight = $(location).find(".section_head").height(); 
        var canvasOffset = () => document.documentElement.style.setProperty('--canvas-offset', `${sectionheadHeight}px`)
        canvasOffset()
    })

    $(".index article").click(function(){
        $(this).parent().parent().find(".index").removeClass("active")
        $(this).parent().parent().find(".content").addClass("active")
        var songID = $(this).data("songid")
        musicPlayer()
        function musicPlayer() {
            $.getJSON("../src/lyric/playlist.json", function(data){
                for (i = 0; i<data.songs.length; i++){
                    if (songID == data.songs[i]['ID']){
                        var src = data.songs[i]['audio'];
                        var title = data.songs[i]['title'];
                        var lyricsjp = data.songs[i]['jp'];
                        var lyricsen = data.songs[i]['en'];

                       /* if (songID == data.songs.length){
                            //last song 
                            var nextAudio = data.songs[0]['audio']
                            var nextTitle = data.songs[0]['title']
                            var nextLyricsjp = data.songs[0]['jp']
                            var nextLyricsen = data.songs[0]['en']
                            
                        } else {
                            var nextAudio = data.songs[i + 1]['audio']
                            var nextTitle = data.songs[i + 1]['title']
                            var nextLyricsjp = data.songs[i + 1]['jp']
                            var nextLyricsen = data.songs[i + 1]['en']
                            
                        } */
                        
                        $("#song-title").html(title)
                        $("#audioFile").attr("src", src)

                        const playBtn = document.getElementById("play")
                        const nextBtn = document.getElementById("next")
                        const prevBtn = document.getElementById("prev")
                        var repeatBtn = document.getElementById("repeat")
                        var randomBtn = document.getElementById("shuffle")
                        var progressBar = document.getElementById("progress-bar")
                        var currentTime = document.getElementById("currentTime")
                        var totalTime = document.getElementById("totalTime")
                        var seeking = false

                        var audio = new Audio()

                        function playAudio() {
                            audio.src = document.getElementById("audioFile").getAttribute("src")
                            audio.loop = false; 
                            $("#loading-icon").hide()
                            audio.play() 
                            $("#pause-icon").show()
                        }
                        
                        playAudio()

                        playBtn.addEventListener("click", playPause)
                        nextBtn.addEventListener("click", nextSong)
                        prevBtn.addEventListener("click", prevSong)
                       /* progressBar.addEventListener("mousedown", function(event){
                            seeking = true; 
                            seek(event);
                        });
                        progressBar.addEventListener("mousemove", function(event){
                            seek(event);
                        })
                        progressBar.addEventListener("mouseup", function(event){
                            seeking = false; 
                        })
                        audio.addEventListener("timeupdate", function(){
                            seektimeupdate();
                        }) 
                        audio.addEventListener("ended", function(){
                            switchTrack();
                        }) */
                        repeatBtn.addEventListener("click", loop);
                        randomBtn.addEventListener("click", random);

                        function playPause(){
                            if (audio.paused){
                                audio.play();
                                $("#play-icon").hide()
                                $("#pause-icon").show()
                            } else {
                                audio.pause()
                                $("#pause-icon").hide()
                                $("#play-icon").show()
                                
                            }
                        }

                        function nextSong(){
                            $("#play-icon").hide()
                            $("#pause-icon").hide()
                            $("#loading-icon").show()
                            audio.pause()
                            if (songID == data.songs.length) {
                                songID = 1
                            } else {
                                songID++; 
                            }
                            src = data.songs[songID - 1]['audio'];
                            title = data.songs[songID - 1]['title'];
                            lyricsjp = data.songs[songID - 1]['jp'];
                            lyricsen = data.songs[songID - 1]['en'];

                            audio = new Audio() 
                            $("#song-title").html(title)
                            $("#audioFile").attr("src", src)
                            playAudio()
                            
                        }

                        function prevSong(){
                            $("#play-icon").hide()
                            $("#pause-icon").hide()
                            $("#loading-icon").show()
                            audio.pause()
                            if (songID == 1) {
                                songID = data.songs.length + 1;
                            } else {
                                songID--; 
                            }
                            src = data.songs[songID - 1]['audio'];
                            title = data.songs[songID - 1]['title'];
                            lyricsjp = data.songs[songID - 1]['jp'];
                            lyricsen = data.songs[songID - 1]['en'];

                            audio = new Audio() 
                            $("#song-title").html(title)
                            $("#audioFile").attr("src", src)
                            playAudio()
                        }

                        function loop(){
                            console.log("loop song")
                        }

                        function random(){
                            console.log("shuffle playlist")
                        }

                        function seektimeupdate(){
                            console.log("no idea what the hell it is")
                        }

                        function seek(){
                            console.log("no idea what the hell it is")
                        }

                        function switchTrack(){
                            console.log("no idea what the hell it is")
                        }

                    }
                }
            })
        }/** function musicPlayer() */
    })

    $(".content button").click(function(){
        $(this).parent().parent().find(".content").removeClass("active")
        $(this).parent().parent().find(".index").addClass("active")
    })

    

})