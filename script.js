pureScriptSelect = (selector) => {
    let selectors = document.querySelectorAll(selector);
    
    function eventDelegation(event, psSelector, program) {
        document.body.addEventListener(event, function(e) {
            document.querySelectorAll(psSelector).forEach(elem => {
                if (e.target === elem) {
                    program(e);
                }
            })
        });
    }
    let defaultValues = {
        [document.querySelector(selector).getAttribute('id')]: eval(document.querySelector(selector).getAttribute('data-multiSelect'))
    };
    let isMax = {
        [document.querySelector(selector).getAttribute('id')]: eval(document.querySelector(selector).getAttribute('data-max'))
    };
  
    selectors.forEach((item, index) => {
        const multiSelect = item.getAttribute('data-multiSelect');
        const isSearch = item.getAttribute('data-isSearch');
        
        function singleSelect(){
            let virtualSelect = document.createElement('div');
            virtualSelect.classList.add('directorist-select__container');
            item.append(virtualSelect);
            item.style.position = 'relative';
            item.style.zIndex = '2';
            let select = item.querySelectorAll('select'),
            sibling = item.querySelector('.directorist-select__container'),
            option = ''           ;
            select.forEach((sel) =>{
                option = sel.querySelectorAll('option');
            });
            let html = `
            <div class="directorist-select__label">
                <div class="directorist-select__label--text">${option[0].text}</div>
                <span class="directorist-select__label--icon"><img src="assets/svg/angle-down-solid.svg" alt=""></span>
            </div>
            <div class="directorist-select__dropdown">
                <input class='directorist-select__search ${ isSearch ? 'directorist-select__search--show' : 'directorist-select__search--hide' }' type='text' class='value' placeholder='Filter Options....' />
                <div class="directorist-select__dropdown--inner"></div>
            </div>`;
            sibling.innerHTML = html;
            let arry = [],
            arryEl = [],
            selectTrigger = sibling.querySelector('.directorist-select__label');

            option.forEach((el, index) => {
                arry.push(el.value);
                arryEl.push(el);
                el.style.display = 'none';
                if(el.hasAttribute('selected')){
                    selectTrigger.innerHTML = el.value +'<img src="assets/svg/angle-down-solid.svg" alt="">';
                };
            });

            var input = item.querySelector('.directorist-select__dropdown input');
            document.body.addEventListener('click', (event) => {
                if(event.target == selectTrigger || event.target == input)
                return;
                sibling.querySelector('.directorist-select__dropdown').classList.remove('directorist-select__dropdown-open');
                input.value = '';
            });

            selectTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                sibling.querySelector('.directorist-select__dropdown').classList.toggle('directorist-select__dropdown-open');
                                
                var elem = [];
                arryEl.forEach((el, index) => {                   
                    if(index !== 0 || el.value !== ''){
                        elem.push(el);
                        el.style.display = 'block';
                    }                      
                });

                var item2 = '<ul>';
                elem.forEach((el, key) => {
                    el.removeAttribute('selected');                    
                    let attribute = '';
                    let attribute2 = '';
                    if(el.hasAttribute('img')){
                        attribute = el.getAttribute('img');
                    }

                    if(el.hasAttribute('icon')) {
                        attribute2 = el.getAttribute('icon');
                    }
                    item2 += `<li><span class="directorist-select-dropdown-text">${el.text}</span> <span class="directorist-select-dropdown-item-icon"><img src="${attribute}" style="${attribute == null && {display: 'none'} } " /><b class="${attribute2}"></b></b></span></li>`;
                });
                item2 += '</ul>';
                var popUp = item.querySelector('.directorist-select__dropdown--inner');
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                li.forEach((el, index) => {
                    el.addEventListener('click', (event) => {
                        elem[index].setAttribute('selected', 'selected');
                        sibling.querySelector('.directorist-select__dropdown').classList.remove('directorist-select__dropdown-open');
                        item.querySelector('.directorist-select__label').innerHTML = el.querySelector('.directorist-select-dropdown-text').textContent +'<img src="assets/svg/angle-down-solid.svg" alt="">';
                    });
                });
            });

            var value = item.querySelector('input');

            value && value.addEventListener('keyup', (event) => {                
                var itemValue = event.target.value.toLowerCase();
                var filter = arry.filter((el, index) => {
                        return el.startsWith(itemValue);
                    });
                var elem = [];
                arryEl.forEach((el, index) => {
                    filter.forEach(e => {
                        if(el.text.toLowerCase() == e){
                            elem.push(el);
                            el.style.display = 'block';
                        }
                    });
                });
                var item2 = '<ul>';
                elem.forEach((el, key) => {
                    var attribute = '';
                    var attribute2 = '';
                    if(el.hasAttribute('img')){
                        attribute = el.getAttribute('img');
                    }

                    if(el.hasAttribute('icon')) {
                        attribute2 = el.getAttribute('icon');
                    }
                    item2 += `<li><span class="directorist-select-dropdown-text">${el.text}</span><span class="directorist-select-dropdown-item-icon"><img src="${attribute}" style="${attribute == null && {display: 'none'} } " /><b class="${attribute2}"></b></b></span></li>`;
                });
                item2 += '</ul>';
                var popUp = item.querySelector('.directorist-select__dropdown--inner');
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                li.forEach((el, index) => {
                    el.addEventListener('click', (event) => {
                        elem[index].setAttribute('selected', 'selected');
                        sibling.querySelector('.directorist-select__dropdown').classList.remove('directorist-select__dropdown-open');
                        item.querySelector('.directorist-select__label').innerHTML = el.querySelector('.directorist-select-dropdown-text').textContent +'<img src="assets/svg/angle-down-solid.svg" alt="">';
                    });
                });
            });
        }
        function multiSelects(){
            const arraySelector = item.getAttribute('id');
            
            
            let virtualSelect = document.createElement('div');
            virtualSelect.classList.add('directorist-select__container');
            item.append(virtualSelect);
            item.style.position = 'relative';
            item.style.zIndex = '0';        
            let select = item.querySelectorAll('select'),
            sibling = item.querySelector('.directorist-select__container'),
            option = '';
            select.forEach((sel) =>{
                option = sel.querySelectorAll('option');
            });        
            let html = `
            <div class="directorist-select__label">
                <div class="directorist-select__selected-list"></div>
                <input class='directorist-select__search ${ isSearch ? 'directorist-select__search--show' : 'directorist-select__search--hide' }' type='text' class='value' placeholder='Filter Options....' />
            </div>
            <div class="directorist-select__dropdown">            
                <div class="directorist-select__dropdown--inner"></div>
            </div>
            <span class="directorist-error__msg"></span>`;

            function insertSearchItem () {
                item.querySelector('.directorist-select__selected-list').innerHTML = defaultValues[arraySelector].map(item => `<span class="directorist-select__selected-list--item">${item.value}&nbsp;&nbsp;<a href="#" data-key="${item.key}" class="directorist-item-remove"><i class="fa fa-times"></i></a></span>`).join("")
            }

            sibling.innerHTML = html;
            let arry = [],
            arryEl = [],
            button = sibling.querySelector('.directorist-select__label');
            el1 = '';
            insertSearchItem();

            option.forEach((el, index) => {
                arry.push(el.value);
                arryEl.push(el);
                el.style.display = 'none';            
                if(el.hasAttribute('selected')){
                    button.innerHTML = el.value +'<span class="angel">&raquo;</span>';
                };            
            });
            option[0].setAttribute('selected', 'selected');
            option[0].value = JSON.stringify(defaultValues[arraySelector]);
                        
            document.body.addEventListener('click', (event) => {                        
                if(event.target == button || event.target.closest('.directorist-select__container')){
                    return;
                } else {
                    sibling.querySelector('.directorist-select__dropdown').classList.remove('directorist-select__dropdown-open');
                }                
            });
            
            button.addEventListener('click', (e) => {
                
                e.preventDefault();
                var value = item.querySelector('input');  
                value.focus();                
                document.querySelectorAll('.directorist-select__dropdown').forEach(el => el.classList.remove('directorist-select__dropdown-open'));
                e.target.closest('.directorist-select__container').querySelector('.directorist-select__dropdown').classList.add('directorist-select__dropdown-open');
                
                var elem = [];
                arryEl.forEach((el, index) => {
                    arryEl.forEach((el, index) => {                   
                        if(index !== 0 || el.value !== ''){
                            elem.push(el);
                            el.style.display = 'block';
                        }                      
                    });     
                });
                var popUp = item.querySelector('.directorist-select__dropdown--inner');
                
                var item2 = '<ul>';
                elem.forEach((el, key) => {
                    el.removeAttribute('selected')     
                    var attribute = '';
                    var attribute2 = '';
                    if(el.hasAttribute('img')){
                        attribute = el.getAttribute('img');
                    }

                    if(el.hasAttribute('icon')) {
                        attribute2 = el.getAttribute('icon');
                    }
                    
                    item2 += `<li data-key="${key}" class="directorist-select-item-hide">${el.text}<i class="item"><img src="${attribute}" style="${attribute == null && {display: 'none'} } " /><b class="${attribute2}"></b></b></i></li>`;
                });
                item2 += '</ul>';
                
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                
                defaultValues[arraySelector].map((item, key) => {
                    li[item.key].classList.remove('directorist-select-item-hide')
                    return li[item.key].classList.add('directorist-select-item-show')
                });

                               
                value && value.addEventListener('keyup', (event) => {                    
                    var itemValue = event.target.value.toLowerCase();
                    var filter = arry.filter((el, index) => {
                            return el.startsWith(itemValue);
                        });   
                        
                    var elem = [];
                    arryEl.forEach((el, index) => {
                        filter.forEach(e => {
                            if(el.text.toLowerCase() == e){
                                elem.push({el, index});
                                el.style.display = 'block';                
                            } 
                        });    
                    });
                    var item2 = '<ul>';                
                    elem.forEach(({el, index}, key) => {
                        var attribute = '';
                        var attribute2 = '';
                        if(el.hasAttribute('img')){
                            attribute = el.getAttribute('img');
                        }

                        if(el.hasAttribute('icon')) {
                            attribute2 = el.getAttribute('icon');
                        }                        
                        item2 += `<li data-key="${index - 1}" class="directorist-select-item-hide">${el.text}<i class="item"><img src="${attribute}" style="${attribute == null && {display: 'none'} } " /><b class="${attribute2}"></b></b></i></li>`;
                    });
                    item2 += '</ul>';
                    
                    var popUp = item.querySelector('.directorist-select__dropdown--inner');
                    popUp.innerHTML = item2;
                    var li = item.querySelectorAll('li');
                    li.forEach((element, index) => {
                        defaultValues[arraySelector].map(item => {
                            if(item.key == element.getAttribute('data-key')){
                                element.classList.remove('directorist-select-item-hide');
                                element.classList.add('directorist-select-item-show');
                            }
                        });                        
                        element.addEventListener('click', (event) => {
                            elem[index].el.setAttribute('selected', 'selected');
                            sibling.querySelector('.directorist-select__dropdown--inner').classList.remove('directorist-select__dropdown.open');                                                
                        });
                    });
                });
                     
                eventDelegation('click', 'li', function(e){
                    var index = e.target.getAttribute('data-key');
                    var closestId = e.target.closest('.directorist-select').getAttribute('id');
                    
                                                         
                    if(isMax[closestId] === null && defaultValues[closestId]){
                        defaultValues[closestId].filter(item => item.key === index ).length === 0 &&  defaultValues[closestId].push({value: elem[index].value, key: index});
                        option[0].setAttribute('selected', 'selected');
                        option[0].value = JSON.stringify(defaultValues[closestId]);                        
                        e.target.classList.remove('directorist-select-item-hide');
                        e.target.classList.add('directorist-select-item-show');
                        insertSearchItem();
                    } else {   
                        if(defaultValues[closestId])
                        if(defaultValues[closestId].length < parseInt(isMax[closestId])){                                                      
                            defaultValues[closestId].filter(item => item.key == index ).length === 0 &&  defaultValues[closestId].push({value: elem[index].value, key: index});
                            option[0].setAttribute('selected', 'selected');
                            option[0].value = JSON.stringify(defaultValues[closestId]);                        
                            e.target.classList.remove('directorist-select-item-hide');
                            e.target.classList.add('directorist-select-item-show');
                            insertSearchItem();
                        } else {                            
                            item.querySelector('.directorist-select__dropdown').classList.remove('directorist-select__dropdown-open');
                            e.target.closest('.directorist-select').querySelector('.directorist-select__container').classList.add('directorist-error');
                            e.target.closest('.directorist-select').querySelector('.directorist-error__msg').innerHTML = `Max ${isMax[arraySelector]} Items Added `;
                        }
                    }
                });
            });

            eventDelegation('click', '.directorist-item-remove', function(e){
                var li = item.querySelectorAll('li');
                var closestId = e.target.closest('.directorist-select').getAttribute('id');
                
                defaultValues[closestId] = defaultValues[closestId] && defaultValues[closestId].filter(item => item.key != parseInt(e.target.getAttribute('data-key')));
                if((defaultValues[closestId] && defaultValues[closestId].length) < (isMax[closestId] && parseInt(isMax[closestId]))){
                    e.target.closest('.directorist-select').querySelector('.directorist-select__container').classList.remove('directorist-error');
                    e.target.closest('.directorist-select').querySelector('.directorist-error__msg').innerHTML = '';
                }

                li.forEach((element, index) => {
                    if(parseInt(e.target.getAttribute('data-key')) === index){                            
                        element.classList.add('directorist-select-item-hide')
                        element.classList.remove('directorist-select-item-show')
                    }
                });

                insertSearchItem();
                option[0].setAttribute('selected', 'selected');
                option[0].value = JSON.stringify(defaultValues[closestId]);
            });            
        }

        multiSelect ? multiSelects() : singleSelect();
       
    });  
}