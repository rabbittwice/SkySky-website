(function(){

    const btnElem = document.querySelector('.dayNightBtn'),
        dgBoxElem = document.querySelector('.drag-box'),
        titleElem = document.querySelector('.title'),
        input = document.querySelector('input[type=file]'),
        storyContainer = document.querySelector('.story-container'),
        story = document.querySelector('.story'),
        modal = document.querySelector('.bg-modal'),
        modalClose = document.querySelector('.close'),
        modalImage = document.querySelector('.modal-image'),
        uploadBtn = document.querySelector('.uploadBtn');
    let mouseState = false,
        titleTop = false;

    // modal close 버튼을 눌렀을 때 이벤트
    modalClose.addEventListener('click', function(){
       modal.style.display = 'none'; 
    });

    // upload 버튼을 눌렀을 때 이벤트
    uploadBtn.addEventListener('click', function(){
        modal.style.display = 'flex';
    });

    // 각 input에 값이 입력 되었을 때 활성화되는 이벤트
    // #when
    const date = document.querySelector('#when');
    let dateValue = false;

    date.addEventListener('change', function(e){    
        if (date.value) {
            dateValue = true;
        }
        if (!date.value) {
            dateValue = false;
        }
        
        // keyup이 해당 안되는 date를 위해 값이 변경될 때 check 이벤트
        if (dateValue && whereValue && nameValue && commentValue == true) {
            submitBtn.style.display = 'flex';
        } else {
            submitBtn.style.display = 'none';
        }

    });
    // #where
    const where = document.querySelector('#where');
    let whereValue = false;

    where.addEventListener('input', function(e){
        if (where.value) {
            whereValue = true;
        }
        if (!where.value) {
            whereValue = false;
        }

    });
    // #name
    const name = document.querySelector('#name');
    let nameValue = false;

    name.addEventListener('input', function(e){
        if (name.value) {
            nameValue = true;
        }
        if (!name.value) {
            nameValue = false;
        }
    });
    // #comment
    const comment = document.querySelector('#comment');
    let commentValue = false;

    comment.addEventListener('input', function(e){
        if (comment.value) {
            commentValue = true;
        }
        if (!comment.value) {
            commentValue = false;
        }
    });
    
    // 모든 input들의 값들이 true가 됐을 때 submit 버튼이 활성화 되는 이벤트
    const submitBtn = document.querySelector('.submitBtn');
    
    window.addEventListener('input', check);
    
    function check (){
        console.log(dateValue, whereValue, nameValue, commentValue);
        if (dateValue && whereValue && nameValue && commentValue == true) {
            submitBtn.style.display = 'flex';
        } else {
            submitBtn.style.display = 'none';
        }
    };

    check();

    // 활성화 된 submit 버튼을 클릭했을 때 이벤트
    submitBtn.addEventListener('click', function(){
        let dateString1 = date.value.slice(2,4)
        let dateString2 = date.value.slice(5,7)
        let dateString3 = date.value.slice(8,10)
        let dateString = dateString1 + '.' + dateString2 + '.' + dateString3;
        console.log(where.value);
        console.log(name.value);
        console.log(comment.value);

        const img = modalImage.firstChild;
        const value = img.naturalWidth / img.naturalHeight;
        if (value > 1){
            img.style.width = '60%';
        };
        if (value == 1){
            img.style.width = '50%';
        };
        if (value < 1){
            img.style.width = '40%';
        };
        img.style.opacity = '0.7';
        img.style.marginTop = '10vh';
        
        new Info (dateString, where.value);
        new Text (comment.value);
        new Name (name.value);


        story.insertBefore(img, story.childNodes[2]);
        modal.style.display = 'none';
    });

    // input된 정보들을 업로드 되도록 하는 생성자함수
    function Info (d, w) {
        this.mainElem = document.createElement('div');
        this.mainElem.classList.add('story-data');
        this.mainElem.innerHTML = ''
            + d + ' morning' + '<br>' + 'in ' + w;
        
        story.insertBefore(this.mainElem, story.childNodes[2]);
    };
    function Text (t) {
        this.mainElem = document.createElement('div');
        this.mainElem.classList.add('story-text');
        this.mainElem.innerHTML = ''
            + '"' + t + '"';

        story.insertBefore(this.mainElem, story.childNodes[3]);      
    };
    function Name (n) {
        this.mainElem = document.createElement('div');
        this.mainElem.classList.add('story-id');
        this.mainElem.innerHTML = ''
            + 'by ' + n + '.' ;

        story.insertBefore(this.mainElem, story.childNodes[4]);      
    };

    // // input[type=file]의 요소가 바꼈을 때 이벤트
    input.addEventListener('change',function(e){
        const reader = new FileReader();
        reader.onload = function() {
            const img = new Image();
            img.src = reader.result;
            img.onload = function() {
                const value = img.naturalWidth * img.naturalHeight;
                const value2 = img.naturalWidth / img.naturalHeight;

                // width가 height보다 더 큰 경우
                if(value2 > 1){
                    img.style.width = '100%';
                    img.style.backgroundSize = 'cover';
                }
                // height가 width보다 더 큰 경우
                if(value2 < 1){
                    img.style.height = '100%';
                    img.style.backgroundSize = 'cover';
                }
                // 정사각형 사진인 경우
                if(value2 == 1){
                    img.style.width = '100%';
                    img.style.backgroundSize = 'cover';
                }
                
                const beforeUpload = document.querySelector('.beforeUpload'),
                    modalText = document.querySelector('.modal-text'),
                    loading = document.querySelector('.loading');

                beforeUpload.style.display = 'none';
                loading.style.display = 'block';
                
                modalImage.insertBefore(img, modalImage.childNodes[0]);

                setTimeout(function(){
                    loading.style.display = 'none';
                    modalImage.style.display = 'flex';
                    modalText.style.display = 'flex';
                    modalImage.style.animation = 'fadeIn';
                    modalImage.style.animationDuration = '1s';
                    modalImage.style.animationFillMode = 'forwards';
                    modalText.style.animation = 'fadeIn';
                    modalText.style.animationDuration = '1s';
                    modalText.style.animationFillMode = 'forwards';
                }, 1000);
            }

        };
        reader.readAsDataURL(input.files[0]);
    });
    
    // day, night 모드 변경 이벤트
    btnElem.addEventListener('click',function(e){
        
        const value = e.target.getAttribute('data-mode');
        document.body.setAttribute('data-mode', value);
        titleElem.style.transitionDuration = '0.8s';       
        
    });
    
    // dragBtn를 누른 상태 
    document.body.addEventListener('mousedown', function(e){
        if(e.target.classList.contains('dragBtn')){
            mouseState = true;
            console.log('드래그 버튼 누른상태');
            dgBoxElem.style.transitionDuration = '0s';
            titleElem.style.transitionDuration = '0s';

            if(titleTop){
                titleElem.style.transitionDuration = '0.2s';
                titleTop = false;
                console.log('타이틀 탑 상태 X');
            }
        };

        
    });
    
    // dragBtn을 누른 후 마우스를 뗀 상태
    document.body.addEventListener('mouseup', function(e){
        
        if(mouseState){
            mouseState = false;
            console.log('드래그 버튼 뗀 상태');
            dgBoxElem.style.transitionDuration = '0.3s';
            titleElem.style.transitionDuration = '0.3s';
            
            let dgBoxTop = dgBoxElem.style.top;
            // string 형식인 dgBoxTop 을 number 형식으로 변환
            dgBoxTop = parseFloat(dgBoxTop);
            console.log('마우스 뗐을 때 dgBoxTop 위치', dgBoxTop);
            
            if (dgBoxTop < 24){
                dgBoxElem.style.top = 24 + '%';
                titleElem.style.top = 10 + '%';
                storyContainer.style.height = '65vh';
                
                titleTop = true;
                console.log('타이틀 탑 상태')
            }
    
            if (dgBoxTop > 94){
                dgBoxElem.style.top = 94 + '%';
            };

        }
    });

    // dragBtn 누른 상태로 마우스 이동
    document.body.addEventListener('mousemove', function(e){
        let clientMouse = e.clientY / window.innerHeight; 

        if(mouseState){
            dgBoxElem.style.top = clientMouse * 100 - 2 + '%';

            if(clientMouse < 0.45){
                console.log('타이틀 움직여!');
                titleElem.style.top = clientMouse * 100 - 10 + '%';
            }
        }

    });



})();