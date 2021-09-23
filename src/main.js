window.addEventListener("load", function () {
  this.setTimeout(() => {
    window.amplifyAudioEXt.appendBtn.bind(window.amplifyAudioEXt)();
  }, 500);
});
(function () {
  const audioAmplifier = {
    btn:null,
    createBtn: function () {
      try {
        let btn = document.createElement("div");
        btn.innerHTML = "<div class='amp-inner-div' id='amp-plus'></div>";
        btn.classList.add("amp-btn");
        btn.classList.add("ytp-button");
        btn.addEventListener("click", (event) => {
          console.log("btn clicked");
        });
        this.btn = btn;
        return btn;
      } catch (error) {
        this.logMsg("error in 'createBtn' func and error  is " + error);
      }
    },
    appendBtn: function () {
      try {
        let btn = this.createBtn();
        let videoControlContainer = document.querySelector(
          this.videoEle.controlContainer
        );
        videoControlContainer.prepend(btn);
        let context = this.createAudioContext(document.querySelector(this.videoEle.video));
        let multiplier = 1;
        btn.addEventListener('click',()=>{
          multiplier = multiplier+3;
          if(multiplier<=20){
            context.amplify(multiplier);
          }
        })
      } catch (error) {
        this.logMsg("error in 'appendBtn' func and error  is " + error);
      }
    },
    videoEle: {
      video: "div.html5-video-container video",
      controlContainer: "div.ytp-chrome-bottom div.ytp-right-controls",
    },
    logMsg: (msg) => {
      console.log("AudioAmplifier::", msg);
    },
    createAudioContext: function (mediaEle) {
      try {
        let context = new (window.AudioContext || window.webkitAudioContext)();
        result = {
          context: context,
          source: context.createMediaElementSource(mediaEle),
          gain: context.createGain(),
          amplify: function (multiplier) {
            result.gain.gain.value = multiplier;
          },
          getAmpLevel: function () {
            return result.gain.gain.value;
          },
        };
        result.source.connect(result.gain);
        result.gain.connect(context.destination);
        return result;
      } catch (error) {
        this.logMsg("error in 'createAudioContext' and error is " + error);
      }
    }
  };
  window.amplifyAudioEXt = audioAmplifier;
})();
