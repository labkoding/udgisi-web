package id.co.labkoding.product.udgisi.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class IndexController {
    @GetMapping(value= {"/home", "/", "/index.html"})
    public String home() {
//        model.addAttribute("allemplist", employeeServiceImpl.getAllEmployee());
        return "index";
    }
    @GetMapping(value= {"/login", "/login.html"})
    public String login() {
//        model.addAttribute("allemplist", employeeServiceImpl.getAllEmployee());
        return "login";
    }
    @GetMapping(value= {"/invoice", "/invoice.html"})
    public String invoice() {
//        model.addAttribute("allemplist", employeeServiceImpl.getAllEmployee());
        return "invoice";
    }
    @GetMapping(value= {"/kwitansi", "/kwitansi.html"})
    public String kwitansi() {
//        model.addAttribute("allemplist", employeeServiceImpl.getAllEmployee());
        return "kwitansi";
    }
    @GetMapping(value= {"/kwpreview", "/kwpreview.html"})
    public String kwpreview() {
//        model.addAttribute("allemplist", employeeServiceImpl.getAllEmployee());
        return "kwpreview";
    }
    @GetMapping(value= {"/registrasi", "/registrasi.html"})
    public String registrasi() {
//        model.addAttribute("allemplist", employeeServiceImpl.getAllEmployee());
        return "registrasi";
    }
    @GetMapping(value= {"/sjpreview", "/sjpreview.html"})
    public String sjpreview() {
//        model.addAttribute("allemplist", employeeServiceImpl.getAllEmployee());
        return "sjpreview";
    }
    @GetMapping(value= {"/suratjalan", "/suratjalan.html"})
    public String suratjalan() {
//        model.addAttribute("allemplist", employeeServiceImpl.getAllEmployee());
        return "suratjalan";
    }
}
