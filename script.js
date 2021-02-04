pureScriptSearchNSelect = (selector) => {
    let selectors = document.querySelectorAll(selector);
    function eventDelegation(event, selector, program) {
        document.body.addEventListener(event, function(e) {
            document.querySelectorAll(selector).forEach(elem => {
                if (e.target === elem) {
                    program(e);
                }
            })
        });
    }
    selectors.forEach((item, index) => {
        const multiSelect = item.getAttribute('multiSelect');
        const isSearch = item.getAttribute('isSearch');

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
            let html = `<span class="directorist-select__label">${option[0].text} <span class="la la-angle-down"></span></span class=""><div class="directorist-select__dropdown">
            <input class='directorist-select__search ${ isSearch ? 'directorist-select__search--show' : 'directorist-select__search--hide' }' type='text' class='value' placeholder='Filter Options....' />
            <div class="directorist-select__dropdown--inner"></div>
            </div>`;
            sibling.innerHTML = html;
            let arry = [],
            arryEl = [],
            selectTrigger = sibling.querySelector('.directorist-select__label');
            // el1 = '';

            option.forEach((el, index) => {
                arry.push(el.value);
                arryEl.push(el);
                el.style.display = 'none';
                if(el.hasAttribute('selected')){
                    selectTrigger.innerHTML = el.value +'<span class="la la-angle-down"></span>';
                };
            });

            var input = item.querySelector('.directorist-select__dropdown input');
            document.body.addEventListener('click', (event) => {
                if(event.target == selectTrigger || event.target == input)
                return;
                sibling.querySelector('.directorist-select__dropdown').classList.remove('hasClass');
                input.value = '';
            });

            selectTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                sibling.querySelector('.directorist-select__dropdown').classList.toggle('hasClass');
                var filter = arry.filter((el, index) => {
                    return el;
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
                    let attribute = '';
                    let attribute2 = '';
                    if(el.hasAttribute('img')){
                        attribute = el.getAttribute('img');
                    }

                    if(el.hasAttribute('icon')) {
                        attribute2 = el.getAttribute('icon');
                    }
                    item2 += `<li>${el.text}`;
                });
                item2 += '</ul>';
                var popUp = item.querySelector('.directorist-select__dropdown--inner');
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                li.forEach((el, index) => {
                    el.addEventListener('click', (event) => {
                        elem[index].setAttribute('selected', 'selected');
                        sibling.querySelector('.directorist-select__dropdown').classList.remove('hasClass');
                        item.querySelector('.directorist-select__label').innerHTML = el.innerHTML +'<span class="la la-angle-down"></span>';
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
                    item2 += `<li>${el.text}</li>`;
                });
                item2 += '</ul>';
                var popUp = item.querySelector('.directorist-select__dropdown--inner');
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                li.forEach((el, index) => {
                    el.addEventListener('click', (event) => {
                        elem[index].setAttribute('selected', 'selected');
                        sibling.querySelector('.directorist-select__dropdown').classList.remove('hasClass');
                        item.querySelector('.directorist-select__label').innerHTML = el.innerHTML +'<span class="la la-angle-down"></span>';
                    });
                });
            });
        }

        function multiSelects(){         
            let selectedItems = eval(multiSelect);
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
            let html = `<div id="directorist-select__label"><div id="directorist-select__selected-list"></div><input class='directorist-select__search ${ isSearch ? 'inputShow' : 'inputHide' }' type='text' class='value' placeholder='Filter Options....' /></div><div class="directorist-select__dropdown">            
            <div class="directorist-select__dropdown--inner"></div>
            </div>`;

            function insertSearchItem () {
                document.getElementById('directorist-select__selected-list').innerHTML = selectedItems.map(item => `<span class="directorist-select__selected-list--item">${item.value}&nbsp;&nbsp;<a href="#" data-key="${item.key}" class="directorist-item-remove">x</a></span>`).join("")
            }
            
            sibling.innerHTML = html;
            let arry = [],
            arryEl = [],
            button = sibling.querySelector('#directorist-select__label');
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
            option[0].value = JSON.stringify(selectedItems);
                        
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
                sibling.querySelector('.directorist-select__dropdown').classList.add('directorist-select__dropdown-open');
                
                var elem = [];
                arryEl.forEach((el, index) => {
                    arry.forEach(e => {
                        if(el.text.toLowerCase() == e){                            
                            elem.push(el);
                            el.style.display = 'block';                
                        } 
                    });     
                });
                var popUp = item.querySelector('.directorist-select__dropdown--inner');
                
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
                    
                    item2 += `<li data-key="${key}" class="hideListItem">${el.text}<i class="item"><img src="${attribute}" style="${attribute == null && {display: 'none'} } " /><b class="${attribute2}"></b></b></i></li>`;
                });
                item2 += '</ul>';
                
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                
                selectedItems.map((item, key) => {
                    li[item.key].classList.remove('hideListItem')
                    return li[item.key].classList.add('showListItem')
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
                        item2 += `<li data-key="${index - 1}" class="hideListItem">${el.text}<i class="item"><img src="${attribute}" style="${attribute == null && {display: 'none'} } " /><b class="${attribute2}"></b></b></i></li>`;
                    });
                    item2 += '</ul>';
                    
                    var popUp = item.querySelector('.directorist-select__dropdown--inner');
                    popUp.innerHTML = item2;
                    var li = item.querySelectorAll('li');
                    li.forEach((element, index) => {
                        selectedItems.map(item => {
                            if(item.key == element.getAttribute('data-key')){
                                element.classList.remove('hideListItem');
                                element.classList.add('showListItem');
                            }
                        });
                        // console.log(boleVal.indexOf(true));
                        element.addEventListener('click', (event) => {
                            elem[index].el.setAttribute('selected', 'selected');
                            sibling.querySelector('.directorist-select__dropdown--inner').classList.remove('directorist-select__dropdown.open');
                            // item.querySelector('button').innerHTML = el.innerHTML +'<span class="angel">&raquo;</span>';                    
                        });
                    });
                });
                eventDelegation('click', 'li', function(e){
                    var index = e.target.getAttribute('data-key');
                    selectedItems.filter(item => item.key === index ).length === 0 && selectedItems.push({value: elem[index].value, key: index});
                        option[0].setAttribute('selected', 'selected');
                        option[0].value = JSON.stringify(selectedItems);
                        
                        e.target.classList.remove('hideListItem');
                        e.target.classList.add('showListItem');
                        insertSearchItem();
                });    
            });

            eventDelegation('click', '.directorist-item-remove', function(e){
                var li = item.querySelectorAll('li');
                selectedItems = selectedItems.filter(item => item.key != parseInt(e.target.getAttribute('data-key')));
                console.log("rr")
                li.forEach((element, index) => {
                    if(parseInt(e.target.getAttribute('data-key')) === index){                            
                        element.classList.add('hideListItem')
                        element.classList.remove('showListItem')
                    }
                })
                
                insertSearchItem();
                option[0].setAttribute('selected', 'selected');
                option[0].value = JSON.stringify(selectedItems);
            });
        }

        multiSelect ? multiSelects() : singleSelect();
       
    });  
}