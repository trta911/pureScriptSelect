pureScriptSearchNSelect = (selector, options) => {
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
        function singleSelect(){
            let virtualSelect = document.createElement('div');
            virtualSelect.classList.add('virtualSelect');
            item.append(virtualSelect);
            item.style.position = 'relative';
            item.style.zIndex = '0';        
            let select = item.querySelectorAll('select'),
            sibling = item.querySelector('.virtualSelect'),
            option = ''           ;
            select.forEach((sel) =>{
                option = sel.querySelectorAll('option');
            });        
            let html = `<button>${option[0].text} <span class"angel">&raquo;</span></button><div class="popUp">
            <input class='pureStyle ${ options.isSearch ? 'inputShow' : 'inputHide' }' type='text' class='value' placeholder='Filter Options....' />
            <div class="popUp2"></div>
            </div>`;
            sibling.innerHTML = html;
            let arry = [],
            arryEl = [],
            button = sibling.querySelector('button');
            el1 = '';
        
            option.forEach((el, index) => {
                arry.push(el.value);
                arryEl.push(el);
                el.style.display = 'none';            
                if(el.hasAttribute('selected')){
                    button.innerHTML = el.value +'<span class="angel">&raquo;</span>';
                };            
            });
            
            //console.log(attribute);
            var input = item.querySelector('.popUp input');
            document.body.addEventListener('click', (event) => {                        
                if(event.target == button || event.target == input)             
                return;
                sibling.querySelector('.popUp').classList.remove('hasClass');
                input.value = '';
            });

            button.addEventListener('click', (e) => {
                e.preventDefault();
                sibling.querySelector('.popUp').classList.toggle('hasClass');
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
                    var attrbute = '';
                    var attrbute2 = '';
                    if(el.hasAttribute('img')){
                        attrbute = el.getAttribute('img');
                    }

                    if(el.hasAttribute('icon')) {
                        attrbute2 = el.getAttribute('icon');
                    }
                    item2 += `<li>${el.text}<i class="item"><img src="${attrbute}" style="${attrbute == null && {display: 'none'} } " /><b class="${attrbute2}"></b></b></i></li>`;
                });
                item2 += '</ul>';
                var popUp = item.querySelector('.popUp2');
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                li.forEach((el, index) => {                               
                    el.addEventListener('click', (event) => {
                        elem[index].setAttribute('selected', 'selected');
                        sibling.querySelector('.popUp').classList.remove('hasClass');
                        item.querySelector('button').innerHTML = el.innerHTML +'<span class="angel">&raquo;</span>';
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
                    var attrbute = '';
                    var attrbute2 = '';
                    if(el.hasAttribute('img')){
                        attrbute = el.getAttribute('img');
                    }

                    if(el.hasAttribute('icon')) {
                        attrbute2 = el.getAttribute('icon');
                    }
                    item2 += `<li>${el.text}<i class="item"><img src="${attrbute}" style="${attrbute == null && {display: 'none'} } " /><b class="${attrbute2}"></b></b></i></li>`;
                });
                item2 += '</ul>';
                var popUp = item.querySelector('.popUp2');
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                li.forEach((el, index) => {
                    el.addEventListener('click', (event) => {
                        elem[index].setAttribute('selected', 'selected');
                        sibling.querySelector('.popUp').classList.remove('hasClass');
                        item.querySelector('button').innerHTML = el.innerHTML +'<span class="angel">&raquo;</span>';                    
                    });
                });
            });
        }

        function multiSelect(){
            let selectedItems = options.defaultValue === undefined ? [] : [...options.defaultValue];
            let virtualSelect = document.createElement('div');
            virtualSelect.classList.add('virtualSelect');
            item.append(virtualSelect);
            item.style.position = 'relative';
            item.style.zIndex = '0';        
            let select = item.querySelectorAll('select'),
            sibling = item.querySelector('.virtualSelect'),
            option = ''           ;
            select.forEach((sel) =>{
                option = sel.querySelectorAll('option');
            });        
            let html = `<div id="searchItem"></div><input id="button" class='pureStyle ${ options.isSearch ? 'inputShow' : 'inputHide' }' type='text' class='value' placeholder='Filter Options....' /><div class="popUp">            
            <div class="popUp2"></div>
            </div>`;

            function insertSearchItem () {
                document.getElementById('searchItem').innerHTML = selectedItems.map(item => `<span class="items">${item.value}&nbsp;&nbsp;<a href="#" data-key="${item.key}" class="delete">x</a></span>`).join("")
            }
            
            sibling.innerHTML = html;
            let arry = [],
            arryEl = [],
            button = sibling.querySelector('#button');
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
            
            //console.log(attribute);
            
            document.body.addEventListener('click', (event) => {                        
                if(event.target == button || event.target.closest('.virtualSelect')){
                    return;
                } else {
                    sibling.querySelector('.popUp').classList.remove('hasClass');
                }                
            });

            button.addEventListener('click', (e) => {
                e.preventDefault();

                sibling.querySelector('.popUp').classList.toggle('hasClass');
                
                var elem = [];
                arryEl.forEach((el, index) => {
                    arry.forEach(e => {
                        if(el.text.toLowerCase() == e){                            
                            elem.push(el);
                            el.style.display = 'block';                
                        } 
                    });     
                });
                
                var item2 = '<ul>';
                elem.forEach((el, key) => {                    
                    var attrbute = '';
                    var attrbute2 = '';
                    if(el.hasAttribute('img')){
                        attrbute = el.getAttribute('img');
                    }

                    if(el.hasAttribute('icon')) {
                        attrbute2 = el.getAttribute('icon');
                    }
                    item2 += `<li class="${selectedItems.map(item => item.key !== key ? 'hideListItem': 'showListItem')}">${el.text}<i class="item"><img src="${attrbute}" style="${attrbute == null && {display: 'none'} } " /><b class="${attrbute2}"></b></b></i></li>`;
                });
                item2 += '</ul>';
                var popUp = item.querySelector('.popUp2');
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                
                li.forEach((el, index) => {                    
                    el.addEventListener('click', (event) => {
                        elem[index].setAttribute('selected', 'selected');
                        selectedItems.filter(item => item.key === index ).length === 0 && selectedItems.push({value: elem[index].value, key: index});
                        
                        event.target.classList.remove('hideListItem')  
                        event.target.classList.add('showListItem')  
                        insertSearchItem();         
                    });
                    eventDelegation('click', '.delete', function(e){
                        selectedItems = selectedItems.filter(item => item.key !== parseInt(e.target.getAttribute('data-key')));
                        insertSearchItem();
                        li[parseInt(e.target.getAttribute('data-key'))].classList.remove('showListItem')
                        li[parseInt(e.target.getAttribute('data-key'))].classList.add('hideListItem')
                        
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
                    var attrbute = '';
                    var attrbute2 = '';
                    if(el.hasAttribute('img')){
                        attrbute = el.getAttribute('img');
                    }

                    if(el.hasAttribute('icon')) {
                        attrbute2 = el.getAttribute('icon');
                    }
                    item2 += `<li>${el.text}<i class="item"><img src="${attrbute}" style="${attrbute == null && {display: 'none'} } " /><b class="${attrbute2}"></b></b></i></li>`;
                });
                item2 += '</ul>';
                var popUp = item.querySelector('.popUp2');
                popUp.innerHTML = item2;
                var li = item.querySelectorAll('li');
                li.forEach((el, index) => {
                    el.addEventListener('click', (event) => {
                        elem[index].setAttribute('selected', 'selected');
                        sibling.querySelector('.popUp').classList.remove('hasClass');
                        item.querySelector('button').innerHTML = el.innerHTML +'<span class="angel">&raquo;</span>';                    
                    });
                });
            });
        }

        options.multiSelect ? multiSelect() : singleSelect();
    });  
}