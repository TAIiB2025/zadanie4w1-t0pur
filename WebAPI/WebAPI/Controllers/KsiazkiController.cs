using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class KsiazkiController : ControllerBase
{
    private static readonly List<Ksiazka> _lista = new()
    {
        new Ksiazka { Id = 1, Tytul = "Zbrodnia i kara", Autor = "Fiodor Dostojewski", Gatunek = "Powieść psychologiczna", Rok = 1866 },
        new Ksiazka { Id = 2, Tytul = "Pan Tadeusz", Autor = "Adam Mickiewicz", Gatunek = "Epopeja narodowa", Rok = 1834 },
        new Ksiazka { Id = 3, Tytul = "Rok 1984", Autor = "George Orwell", Gatunek = "Dystopia", Rok = 1949 },
        new Ksiazka { Id = 4, Tytul = "Wiedźmin: Ostatnie życzenie", Autor = "Andrzej Sapkowski", Gatunek = "Fantasy", Rok = 1993 },
        new Ksiazka { Id = 5, Tytul = "Duma i uprzedzenie", Autor = "Jane Austen", Gatunek = "Romans", Rok = 1813 }
    };
    private static int _idGen = 6;

    // GET + opcjonalny filter
    [HttpGet]
    public ActionResult<IEnumerable<Ksiazka>> GetAll([FromQuery] string? fraza)
    {
        var wynik = string.IsNullOrWhiteSpace(fraza)
            ? _lista
            : _lista.Where(k => k.Tytul.Contains(fraza, StringComparison.OrdinalIgnoreCase)).ToList();
        return Ok(wynik);
    }

    // GET po id
    [HttpGet("{id}")]
    public ActionResult<Ksiazka> GetById(int id)
    {
        var ks = _lista.FirstOrDefault(k => k.Id == id);
        return ks == null ? NotFound() : Ok(ks);
    }

    // POST
    [HttpPost]
    public ActionResult Post(Ksiazka ksiazka)
    {
        var err = Waliduj(ksiazka);
        if (err != null) return BadRequest(err);

        ksiazka.Id = _idGen++;
        _lista.Add(ksiazka);
        return CreatedAtAction(nameof(GetById), new { id = ksiazka.Id }, ksiazka);
    }

    // PUT
    [HttpPut("{id}")]
    public ActionResult Put(int id, Ksiazka ksiazka)
    {
        var idx = _lista.FindIndex(k => k.Id == id);
        if (idx == -1) return NotFound();

        var err = Waliduj(ksiazka);
        if (err != null) return BadRequest(err);

        ksiazka.Id = id;
        _lista[idx] = ksiazka;
        return NoContent();
    }

    // DELETE
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        if (_lista.RemoveAll(k => k.Id == id) == 0) return NotFound();
        return NoContent();
    }

    // Walidacja
    private string? Waliduj(Ksiazka k)
    {
        if (string.IsNullOrWhiteSpace(k.Tytul) || k.Tytul.Length > 100)
            return "Tytuł wymagany, max 100 znaków.";
        if (string.IsNullOrWhiteSpace(k.Gatunek))
            return "Gatunek wymagany.";
        var dopuszczalne = new[] { "fantasy", "romans", "dystopia" };
        if (!dopuszczalne.Contains(k.Gatunek.Trim().ToLower()))
            return $"Gatunek musi być: fantasy, romans lub dystopia.";
        if (k.Rok > 2025) return "Rok nie może być większy niż 2025.";
        return null;
    }
}
