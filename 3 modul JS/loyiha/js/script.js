'use string';

// const { hidden } = require("colorette");

window.addEventListener('DOMContentLoaded', ()=>{
    const tapParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'), 
    tabsContent = document.querySelectorAll('.tabcontent'),
    loader = document.querySelector('.loader')


    // loader
    
    setTimeout(() => {
        loader.style.opacity= '0'
        setTimeout(() => {
            loader.style.display='none'
        },500)
    },2000)

    // tab

    function hideTabContent(){
        tabsContent.forEach((item) => {
            item.classList.add('hide')
            item.classList.remove('show')
        })
        tabs.forEach((item) =>{
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()

    tapParent.addEventListener('click',(event)=>{
        const target = event.target
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item,idx)=>{
                if(target == item){
                    hideTabContent()
                    showTabContent(idx)
                }
            })
        }
    
    })

    // Timer
    const deadLine ='2023-07-26'
    
    
    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds;
        const timer = Date.parse(endtime) - Date.parse(new Date())

        if(timer <= 0){
            days = 0
            hours = 0
            minutes = 0
            seconds = 0 
        }else{
            days = Math.floor(timer / (1000 * 60 * 60 * 24))
            hours = Math.floor((timer /(1000 * 60 * 60)) %24)
            minutes = Math.floor((timer / 1000 / 60 )% 60)
            seconds = Math.floor((timer /1000 ) %60)
        }
        return {timer, days, hours, minutes, seconds}
    }
    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`
        }else   {
             return num
        }    
    }
    function setClock(selector , endtime){
        const timer = document.querySelector(selector),
        days = document.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds')
        timeInterval = setInterval(updateClock, 1000)
        
        function updateClock(){
            const t = getTimeRemaining(endtime)
            
            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)
            if(t.timer <= 0){
                clearInterval(timeInterval)
            }
        }
    }
    setClock('.timer', deadLine)

    // modal


    const modalTrigger = document.querySelector('[data-modal]')
    modal = document.querySelector('.modal')
    modalCloseBtn = document.querySelector('[data-close]')
    
    function closemodal(){
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow =''       
    }

    function openModel(){
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow='hidden' 
        clearInterval(modalTimerId)      
    }
    modalTrigger.addEventListener('click', openModel)

    modalCloseBtn.addEventListener('click', closemodal)

    modal.addEventListener('click', (e)=> {
        if(e.target == modal){
            closemodal()
        }
    })
    document.addEventListener('keydown', (e)=>{
        if(e.code ==='Escape' && modal.classList.contains('show')){
            closemodal()
        }
    })

    const modalTimerId = setTimeout(openModel,3000)


})
