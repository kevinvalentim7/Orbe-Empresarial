import './style.css'

const states = [
  { name: 'Saudável', color: '#2fa36b', desc: 'Indicadores equilibrados. Hora de planejar o crescimento.' },
  { name: 'Atenção', color: '#e0b020', desc: 'Há pontos que merecem acompanhamento mais próximo.' },
  { name: 'Risco elevado', color: '#e8772e', desc: 'Sinais de alerta ativos. Ação preventiva recomendada.' },
  { name: 'Crítico', color: '#d64545', desc: 'Situação crítica. Diagnóstico e plano de recuperação urgentes.' },
]

// Medidor do Índice ORBE
const NS = 'http://www.w3.org/2000/svg'
const seg = document.getElementById('segments')
const pt = (deg, r) => {
  const a = (deg * Math.PI) / 180
  return `${(150 + r * Math.cos(a)).toFixed(1)} ${(150 - r * Math.sin(a)).toFixed(1)}`
}
states.forEach((s, i) => {
  const a1 = 180 - i * 45 - 1.5
  const a2 = 180 - (i + 1) * 45 + 1.5
  const p = document.createElementNS(NS, 'path')
  p.setAttribute('d', `M ${pt(a1, 125)} A 125 125 0 0 1 ${pt(a2, 125)}`)
  p.setAttribute('stroke', s.color)
  p.setAttribute('class', 'seg')
  p.dataset.i = i
  seg.appendChild(p)
})

const needle = document.getElementById('needle')
const stateEl = document.getElementById('gauge-state')
const descEl = document.getElementById('gauge-desc')
const tabs = document.querySelectorAll('.gauge-tabs button')

function setState(i) {
  needle.style.transform = `rotate(${-67.5 + i * 45}deg)`
  stateEl.textContent = states[i].name
  stateEl.style.color = states[i].color
  descEl.textContent = states[i].desc
  tabs.forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)))
  document.querySelectorAll('.seg').forEach((s) => s.classList.toggle('on', +s.dataset.i === i))
}
tabs.forEach((b) => b.addEventListener('click', () => setState(+b.dataset.i)))
setState(0)

// Menu no celular
const btn = document.querySelector('.menu-btn')
const menu = document.getElementById('menu')
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open')
  btn.setAttribute('aria-expanded', String(open))
})
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open')
    btn.setAttribute('aria-expanded', 'false')
  }
})

// Formulário (somente front-end: ainda sem envio para servidor)
const form = document.getElementById('contact-form')
const msg = document.getElementById('form-msg')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const d = new FormData(form)
  const okEmail = /^\S+@\S+\.\S+$/.test(d.get('email') || '')
  if (!d.get('nome').trim() || !okEmail || !d.get('mensagem').trim()) {
    msg.textContent = 'Preencha nome, um e-mail válido e a mensagem para enviar.'
    msg.className = 'err'
    return
  }
  msg.textContent = 'Mensagem recebida. Entraremos em contato em breve.'
  msg.className = 'ok'
  form.reset()
})

document.getElementById('year').textContent = new Date().getFullYear()
